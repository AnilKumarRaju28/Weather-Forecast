function TimeAndLocation({ weather: { formattedLocalTime, name, country } }) {
    return (
        <div>
            <div className="flex items-center justify-center my-6">
                <p className="text-2xl font-light">
                    {formattedLocalTime}
                </p>
            </div>
            <div className="flex items-center justify-center my-3">
                <p className="text-4xl font-medium">{`${name}, ${country}`}</p>
            </div>
        </div>
    )
}

export default TimeAndLocation