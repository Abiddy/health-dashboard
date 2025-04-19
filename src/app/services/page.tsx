import { ServiceCard } from "@/components/ui/service-card"
import { Button } from "@/components/ui/button"
import { createServerClient } from "@/lib/supabase"

export default async function ServicesPage() {
  try {
    // Fetch services directly from the database in the server component
    const supabase = createServerClient();
    
    // Log Supabase URL to verify connection
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    const { data: services, error } = await supabase
      .from('services')
      .select('*');
    
    if (error) {
      console.error('Error fetching services:', error);
      return <div className="min-h-screen bg-[#111111] text-white p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Error loading services</h2>
          <p className="text-red-400">{error.message}</p>
        </div>
      </div>;
    }
  
    // Detailed logging to debug the services data
    console.log('services:', JSON.stringify(services, null, 2));
    console.log('Number of services:', services?.length || 0);
    
    if (!services || services.length === 0) {
      return <div className="min-h-screen bg-[#111111] text-white p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">No services available</h2>
          <p>Please check your database connection or add services to the database.</p>
        </div>
      </div>;
    }
  
    return (
      <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with view all services button */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-light">Services</h1>
            <Button variant="ghost" className="text-white hover:text-white hover:bg-black/30">
              View my services
            </Button>
          </div>
          
          {/* This part requires user interaction, so we have moved it into a client component */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map(service => {
              console.log('Rendering service:', service.id, service.title);
              return (
                <ServiceCard
                  key={service.id}
                  title={service.title || 'Untitled Service'}
                  description={service.description || 'No description available'}
                  imageSrc={service.image_url || '/placeholder.png'}
                  tag={service.tag}
                  subtext={service.subtext}
                  showArrow={Boolean(service.show_arrow)}
                  href={`/services/${service.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    )
  } catch (e) {
    console.error('Unexpected error in services page:', e);
    return <div className="min-h-screen bg-[#111111] text-white p-4 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl mb-4">Something went wrong</h2>
        <p className="text-red-400">{(e as Error).message || 'An unexpected error occurred'}</p>
      </div>
    </div>;
  }
} 