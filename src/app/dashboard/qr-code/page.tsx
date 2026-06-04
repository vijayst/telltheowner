import { QRCodeView } from "@/components/dashboard/QRCodeView";

export const metadata = {
  title: "QR Code - Tell the Owner",
  description: "Display and print your business QR code to let customers scan and leave reviews.",
};

export default function QRCodePage() {
  return <QRCodeView />;
}