"use client"
import LineChartPage from "@/components/charts/charts";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full">
      <Navbar />
      <div className="h-full ">
        <LineChartPage />
      </div>
    </div>
  );
}
