import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  imageSrc: string
  tag?: string
  alt?: string
  subtext?: string
  showArrow?: boolean
  compact?: boolean
  href?: string
}

export function ServiceCard({ 
  title, 
  description, 
  imageSrc, 
  tag, 
  alt,
  subtext,
  showArrow = false,
  compact = false,
  href
}: ServiceCardProps) {
  if (compact) {
    return (
      <div className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={imageSrc}
                alt={alt || title}
                width={60}
                height={60}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-medium text-white">{title}</h3>
              <p className="text-sm text-gray-400">{description}</p>
              {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
            </div>
          </div>
          
          {showArrow ? (
            <Button variant="ghost" size="icon" className="rounded-full w-8 h-8 bg-black/30 hover:bg-black/50 flex-shrink-0">
              <Link href={href || "#"}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="bg-black/30 hover:bg-black/40 text-white flex-shrink-0">
              <Link href={href || "#"}>
                Get started
              </Link>
            </Button>
          )}
        </div>
      </div>
    )
  }
  
  // Standard service card (full card)
  return (
    <Card className="bg-black/20 border-0 overflow-hidden rounded-xl flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-[180px] w-full overflow-hidden rounded-t-xl">
        <Image 
          src={imageSrc} 
          alt={alt || title} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {tag && (
          <span className="absolute top-3 left-3 bg-[#8B4513]/90 text-white text-xs px-3 py-1 rounded-full">
            {tag}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow space-y-2">
          <h3 className="text-xl font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
          {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
        
        <div className="mt-4">
          {showArrow ? (
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-black/30 hover:bg-black/50">
                <Link href={href || "#"}>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="lg" className="w-full bg-black/30 hover:bg-black/40 text-white">
              <Link href={href || "#"} className="w-full">
                Get started
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
} 