import React, { useState, useEffect } from 'react';
import { themeChange } from 'theme-change';

export default function ThemeToggler() {
    // get current toggle state from localStorage
    const [toggled, setToggled] = useState(
        JSON.parse(localStorage.getItem('toggled')) || false
    );
    // toggle theme
    useEffect(() => {
        themeChange(false)
        return () => {
            themeChange(false);
        };
    }, [])


    // update localStorage on toggle state change to persist toggled state on page reload/refresh
    useEffect(() => {
        localStorage.setItem('toggled', JSON.stringify(toggled));
    }, [toggled]);

    const handleToggleChange = () => {
        setToggled(!toggled);
    };

    return (
        <div className="z-20 flex justify-center mb-6">
            <span className="text-sm text-primary">Jedi Mode</span>
            <input
                type="checkbox"
                className="toggle toggle-error mx-3"
                data-toggle-theme="dark,light"
                checked={toggled}
                onChange={handleToggleChange}
            />
            <span className="text-sm text-primary">Sith Mode</span>
        </div>
    )
}