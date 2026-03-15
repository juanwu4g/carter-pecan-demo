import { customers } from "../data/data";
import InsightBox from "./InsightBox";

export default function Customers({ t }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-green-primary">{t.customersTitle}</h2>

      <InsightBox text={t.customersAlert} variant="warning" />

      <div className="bg-white rounded-xl shadow-sm border border-cream-dark overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-primary text-white">
              <th className="text-left px-4 py-3 font-medium">{t.customer}</th>
              <th className="text-left px-4 py-3 font-medium">{t.country}</th>
              <th className="text-right px-4 py-3 font-medium">{t.revenue}</th>
              <th className="text-right px-4 py-3 font-medium">{t.orders}</th>
              <th className="text-left px-4 py-3 font-medium">{t.lastOrder}</th>
              <th className="text-left px-4 py-3 font-medium">{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((row, i) => (
              <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3">{row.country}</td>
                <td className="px-4 py-3 text-right">${row.revenue.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">{row.orders}</td>
                <td className="px-4 py-3">{row.lastOrder}</td>
                <td className="px-4 py-3">
                  {row.status === "active" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {t.active}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      ⚠ Inactive {row.inactiveDays}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
