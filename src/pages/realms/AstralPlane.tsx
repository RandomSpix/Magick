import React from 'react';
import { RealmLayout } from '@/components/realms/RealmLayout';

export function AstralPlanePage() {
  return (
    <RealmLayout
      title="Astral Plane"
      description="Explore the ethereal dimensions of consciousness and spiritual awakening"
      coverImage="https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    >
      <div className="space-y-6">
        <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Astral Plane</h2>
          <p className="text-gray-600 leading-relaxed">
            The Astral Plane is a realm of pure consciousness and spiritual exploration. 
            Here, seekers can share their astral projection experiences, dream journeys, 
            and insights from higher dimensions.
          </p>
        </section>

        {/* Add realm-specific content here */}
      </div>
    </RealmLayout>
  );
}