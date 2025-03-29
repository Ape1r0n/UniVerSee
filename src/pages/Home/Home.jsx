import { Search } from "lucide-react"
// import { Button } from "@/components/ui/button"
import { Input } from "../../components/Input/input.jsx";
import './Home.css'
// import BannerCard from "@/components/banner-card"

const Home = () =>{
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Find Your Perfect University & Faculty
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Search through thousands of universities and faculties to find the perfect match for your academic journey.
          </p>
        </header>

        <div className="mx-auto mb-16 max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search universities or faculties..."
              className="h-14 rounded-lg border-gray-300 pl-4 pr-12 text-lg shadow-sm focus:border-primary focus:ring-primary"
            />
            {/* <Button className="absolute right-1 top-1 h-12 w-12 rounded-md" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button> */}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* <BannerCard
            title="Universities"
            description="Browse through our comprehensive list of universities worldwide"
            icon="building"
            href="/universities"
          />
          <BannerCard
            title="Faculties"
            description="Explore various faculties and academic departments"
            icon="book-open"
            href="/faculties"
          /> */}
        </div>
      </div>
    </div>
  )
}

export default Home;

