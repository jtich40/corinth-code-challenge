import React, { useEffect } from 'react';
import { themeChange } from 'theme-change';

export default function ThemeToggler() {
    useEffect(() => {
        themeChange(false)
        return () => {
            themeChange(false);
        };
    }, [])

    return (
        <div className="flex justify-center mb-6">
            <span className="text-sm">Jedi Mode</span>
            <input
                type="checkbox"
                className="toggle toggle-error mx-3"
                data-toggle-theme="dark,light"
            />
            <span className="text-sm">Sith Mode</span>
        </div>
    )
}