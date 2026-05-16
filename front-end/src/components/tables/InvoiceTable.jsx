import jsPDF from "jspdf";

export default function InvoiceTable({ invoices = [] }) {
  const downloadInvoice = (inv) => {
    const doc = new jsPDF();

    const appName = inv.subscriptionId?.appId?.name || "-";
    const planName = inv.subscriptionId?.planId?.name || "-";
    const date = new Date(inv.issuedDate).toLocaleDateString();

    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("SaaS Manager", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Subscription Invoice", 20, 28);

    doc.setTextColor(31, 41, 55);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 20, 55);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice No: ${inv.invoiceNumber}`, 20, 65);
    doc.text(`Issued Date: ${date}`, 20, 72);

    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(20, 85, 170, 55, 3, 3);

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Subscription Details", 28, 98);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Application: ${appName}`, 28, 110);
    doc.text(`Plan: ${planName}`, 28, 120);
    doc.text(`Payment Status: ${inv.status}`, 28, 130);

    doc.setFillColor(239, 246, 255);
    doc.roundedRect(20, 155, 170, 35, 3, 3, "F");

    doc.setTextColor(31, 41, 55);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount", 28, 170);

    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235);
    doc.text(`Rs. ${inv.amount}`, 150, 170, { align: "right" });

    doc.setTextColor(107, 114, 128);
    doc.setFontSize(10);
    doc.text("Thank you for using SaaS Manager.", 20, 270);
    doc.text("This is a system-generated invoice.", 20, 277);

    doc.save(`${inv.invoiceNumber}.pdf`);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-md border border-gray-200 dark:border-slate-700">
      <div className="border-b border-blue-500/20 bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 text-white">
        <h2 className="text-xl font-bold">Invoice History</h2>
        <p className="text-sm text-blue-100">
          View and download your subscription invoices
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-800 dark:text-slate-200">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            <tr>
              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Application</th>
              <th className="p-4 text-left">Plan</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr
                key={inv._id}
                className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                  {inv.invoiceNumber}
                </td>

                <td className="p-4 text-slate-700 dark:text-slate-300">
                  {inv.subscriptionId?.appId?.name || "-"}
                </td>

                <td className="p-4 text-slate-700 dark:text-slate-300">
                  {inv.subscriptionId?.planId?.name || "-"}
                </td>

                <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                  ₹{inv.amount}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 dark:bg-green-900/40 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-300">
                    {inv.status}
                  </span>
                </td>

                <td className="p-4 text-slate-700 dark:text-slate-300">
                  {new Date(inv.issuedDate).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => downloadInvoice(inv)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {invoices.length === 0 && (
          <div className="p-10 text-center text-slate-500 dark:text-slate-400">
            No invoices found
          </div>
        )}
      </div>
    </div>
  );
}