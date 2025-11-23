import { useEffect, useRef } from "react"
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const EyeDetection: React.FC<any> = ({ setIsDistracted }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const distractionStartRef = useRef<number | null>(null);
  const stableFocusRef = useRef<boolean>(true);


  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement?.getContext("2d");

    if (!videoElement || !canvasElement) return;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 2,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (!canvasCtx) return;
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height
      )

      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          for (const point of landmarks) {
            canvasCtx.beginPath();
            canvasCtx.arc(point.x * canvasElement.width, point.y * canvasElement.height, 1, 0, 2 * Math.PI);
            // canvasCtx.fillStyle = "cyan";
            canvasCtx.fill();
          }

          // Helper to map points
          const get = (id: number) => ({
            x: landmarks[id].x * canvasElement.width!,
            y: landmarks[id].y * canvasElement.height!,
          });

          // Eye landmarks
          const L_TOP = get(159);
          const L_BOTTOM = get(145);
          const L_LEFT = get(33);
          const L_RIGHT = get(133);

          const R_TOP = get(386);
          const R_BOTTOM = get(374);
          const R_LEFT = get(263);
          const R_RIGHT = get(362);

          // Face direction landmarks
          const NOSE = get(1);
          const LEFT_CHEEK = get(234);
          const RIGHT_CHEEK = get(454);

          // Distance helper
          const dist = (a: any, b: any) =>
            Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

          // Eye ratios
          const leftRatio = dist(L_TOP, L_BOTTOM) / dist(L_LEFT, L_RIGHT);
          const rightRatio = dist(R_TOP, R_BOTTOM) / dist(R_LEFT, R_RIGHT);
          const eyeOpenRatio = (leftRatio + rightRatio) / 2;

          // Face rotation
          const noseToLeft = dist(NOSE, LEFT_CHEEK);
          const noseToRight = dist(NOSE, RIGHT_CHEEK);

          let faceDirection = "center";
          if (noseToLeft > noseToRight * 3) faceDirection = "right";
          if (noseToRight > noseToLeft * 3) faceDirection = "left";

          let focused = true;
          if (eyeOpenRatio < 0.18) focused = false;

          if (faceDirection !== "center") focused = false;

          if (faceDirection !== "left" && faceDirection !== "right") {
            if (
              noseToLeft > noseToRight * 4 ||
              noseToRight > noseToLeft * 4
            ) {
              focused = false;
            }
          }

          const now = Date.now();

          // If distracted
          if (!focused) {
            if (distractionStartRef.current === null) {
              distractionStartRef.current = now; // start timer
            }

            // Check if distraction time exceeded 2 seconds
            const diff = (now - distractionStartRef.current) / 1000;
            console.log(distractionStartRef.current, now, diff)

            if (diff >= 10) {
              stableFocusRef.current = false; // officially distracted
            }
          }

          // If focused again
          else {
            distractionStartRef.current = null;
            stableFocusRef.current = true;
          }

          // Draw status
          canvasCtx.font = "24px Arial";
          canvasCtx.fillStyle = stableFocusRef.current ? "lime" : "red";
          canvasCtx.fillText(
            stableFocusRef.current ? "FOCUSED" : "DISTRACTED",
            20,
            40
          );

          // Send distraction state to parent
          setIsDistracted(!stableFocusRef.current);

        }

      }

      canvasCtx.restore();
    })

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await faceMesh.send({ image: videoElement });
      },
      width: 640,
      height: 480,
    });

    camera.start();

    return () => {
      videoElement.srcObject = null;
    };

  }, [])

  return (
    <div className="relative w-full flex justify-end">
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} width={150} height={100} />
    </div>
  )
}

export default EyeDetection;
