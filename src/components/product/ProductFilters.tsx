
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface ProductFiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  brands: string[];
  categories: string[];
}

export const ProductFilters = ({
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
  brands,
  categories
}: ProductFiltersProps) => (
  <div className="space-y-6">
    <div>
      <h3 className="font-semibold mb-3">Price Range</h3>
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
            className="text-sm"
          />
          <Input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
            className="text-sm"
          />
        </div>
        <div className="text-xs text-gray-500">
          ৳{priceRange[0]} - ৳{priceRange[1]}
        </div>
      </div>
    </div>

    {brands.length > 0 && (
      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand]);
                  } else {
                    setSelectedBrands(selectedBrands.filter(b => b !== brand));
                  }
                }}
              />
              <Label htmlFor={brand} className="text-sm cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>
    )}

    {categories.length > 0 && (
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox
                id={cat}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, cat]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== cat));
                  }
                }}
              />
              <Label htmlFor={cat} className="text-sm cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
