import './App.css';
import React, {Component, useEffect, useState} from "react";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import Graphics from "./Graphics/Graphics";

export default function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {
        return fetch("https://wegotrip.com/api/v2/stats/plot", {mode: 'no-cors'})
            .then(
                res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
                <>
                    <div className="container">
                        <Graphics/>
                    </div>
                    <ul>
                        {items.map(item => (
                            <li>
                                {item.purchases.date}
                            </li>
                        ))}
                    </ul>
                </>

        );
    }

}



