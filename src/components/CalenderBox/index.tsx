'use client';

import React, { useEffect, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

export default function CalendarBox() {
    const [calendar, setCalendar] = useState<DayPilot.Calendar>();

    const initialConfig: DayPilot.CalendarConfig = {
        viewType: "WorkWeek",
        startDate: "2025-01-01",
        locale: "en-us"
    };

    const [config, setConfig] = useState(initialConfig);

    useEffect(() => {
        if (!calendar || calendar?.disposed()) {
            return;
        }

        const events: DayPilot.EventData[] = [
        
          {
            id: 1,
            text: "New Year",
            start: "2025-01-01T00:00:00",
            end: "2025-01-01T23:59:00",
            tags: {
                participants: 2,
            }
        },
            // Add more Tunisian events as needed
        ];

        calendar.update({ events });
    }, [calendar]);

    return (
        <div>
            <DayPilotCalendar
                {...config}
                controlRef={setCalendar}
            />
        </div>
    );
}
