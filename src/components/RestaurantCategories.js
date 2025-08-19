import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function RestaurantCategories({ categories }) {
  return (
    <div className="px-4 md:px-8 py-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
        Browse Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
          >
            <CardContent className="flex flex-col items-center justify-center p-4">
              <img
                src={category.image}
                alt={category.name}
                className="w-16 h-16 object-cover rounded-full mb-3 border"
              />
              <p className="text-sm md:text-base font-medium text-gray-700 text-center">
                {category.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
