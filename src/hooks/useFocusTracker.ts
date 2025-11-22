import { useEffect, useRef, useState } from "react"

export const useFocusTracker = (distractionTime = 5000) => {
    const [timeSpent, setTimeSpent] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const distractionTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const timer = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!("Notification" in window)) return;
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permissions) => {
                console.log("permission Granted?", permissions)
            });
        }
    }, []);


    useEffect(() => {
        const showBrowserNotification = () => {
            if (!("Notification" in window)) return;
            if (Notification.permission === "granted") {
                new Notification("Come back! Focus on your reading.");
            }
        };

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                setIsActive(true);
                setShowNotification(false);
                if (distractionTimeoutRef.current) {
                    clearTimeout(distractionTimeoutRef.current);
                    distractionTimeoutRef.current = null;
                }
            } else {
                setIsActive(false);
                distractionTimeoutRef.current = window.setTimeout(() => {
                    setShowNotification(true);
                    showBrowserNotification();
                }, distractionTime);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        }

    }, [distractionTime]);

    return { timeSpent, isActive, showNotification };
}