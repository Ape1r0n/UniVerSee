import { useEffect, useRef } from 'react';
import './Home.css'
import { Search } from "lucide-react"
import { Input } from "../../components/Input/Input.jsx";
import { Button } from "../../components/Button/Button.jsx"
import { Building, BookOpen } from "lucide-react"
import { CardLink } from "../../components/CardLink/CardLink.jsx";
import backgroundImage from "../../assets/bg.webp"

const Home = () => {
  return (
      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
            გახდი ის ვინც გინდა
          </h1>
          <p className="mx-auto max-w-2xl mt-4 text-lg text-gray-300">
            მოძებნეთ ასობით უნივერსიტეტი და ფაკულტეტი, რომ იპოვოთ თქვენთვის შესაბამისი მომვალის გზა.
          </p>
        </header>

        <div className="mx-auto mb-16 max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="უნივერსიტეტი, ფაკულტეტი..."
              className="h-14 rounded-lg border-gray-300 pl-4 pr-12 text-lg shadow-sm "
            />
            <Button className="absolute right-1 top-1 h-12 w-12 rounded-md" size="icon">
              <Search className="h-5 w-5 text-white" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <CardLink
            to="/universities"
            icon={Building}
            title="უნივერსიტეტები"
            description="იხილეთ საქართველოს უნივერსიტეტების სრული სია"
          />
          <CardLink
            to="/faculties"
            icon={BookOpen}
            title="ფაკულტეტები"
            description="იხილეთ სხვადასხვა ფაკულტეტები და აკადემიური დეპარტამენტები"
          />
        </div>
      </div>
  )
}

export default Home;