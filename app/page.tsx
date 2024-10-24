"use client"
import dynamic from 'next/dynamic';
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from 'react-hot-toast';

const LineChartPage = dynamic(() => import("@/components/charts/charts"), { 
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default function Home() {
  return (
    <div className="h-full">
      <Toaster />
      <Navbar />
      <div className="h-full ">
        <LineChartPage />
      </div>
    </div>
  );
}
