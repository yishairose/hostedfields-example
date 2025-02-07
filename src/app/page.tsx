import PaymentPage from "./components/PaymentPage";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen w-screen">
      <h1 className="text-3xl font-bold underline">Ecom Payment Example App</h1>
      <PaymentPage />
    </div>
  );
}
