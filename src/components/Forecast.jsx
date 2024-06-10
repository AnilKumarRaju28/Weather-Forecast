function Forecast({ title, data }) {
    return (
        <div>
            <div className="flex items-center justify-start mt-6">
                <p className="font-normal   uppercase">{title}</p>
            </div>
            <hr className="my-1" />
            <div className="flex items-center justify-between">
                {data.map((d, index) => (
                    <div key={index} className="flex flex-col items-center justify-center">
                        <p className="font-light text-lg">{d.time}</p>
                        <img src={d.icon} alt="Weather icon" className="w-16 my-1" />
                        <p className="font-medium">{`${d.temp.toFixed()}°`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
