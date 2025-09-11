import React from "react";

const Services = () => {
  const serviceHistory = [
    {
      id: 1,
      service: "Home Cleaning",
      date: "2024-12-15",
      status: "Completed",
      provider: "CleanPro Services",
      amount: "$150",
    },
    {
      id: 2,
      service: "Office Cleaning",
      date: "2024-12-10",
      status: "Completed",
      provider: "OfficeClean Solutions",
      amount: "$300",
    },
    {
      id: 3,
      service: "Event Services",
      date: "2024-12-05",
      status: "Scheduled",
      provider: "Event Masters",
      amount: "$500",
    },
  ];
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Service History
        </h2>
        <div className="space-y-4">
          {serviceHistory.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {service.service}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Provider: {service.provider}
                  </p>
                  <p className="text-sm text-gray-500">Date: {service.date}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      service.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {service.status}
                  </span>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {service.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;
