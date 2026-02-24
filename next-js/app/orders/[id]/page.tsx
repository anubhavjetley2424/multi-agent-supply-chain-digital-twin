import { OrderDigitalTwin } from "@/components/control-tower/OrderDigitalTwin";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;

  return <OrderDigitalTwin orderId={id} />;
}