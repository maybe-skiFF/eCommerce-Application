import './Main.scss';
import { ShopCard } from 'src/components/shopCard/ShopCard';
import { CategoryImage } from 'src/components/categoryImage/CategoryImage';
import { SortItem } from 'src/components/sortItem/sortItem';
import { CategoryChoice } from 'src/components/categoryChoice/CategoryChoice';

export function Main() {
  return (
    <main className="main container">
      <CategoryChoice />
      <CategoryImage selectedCategory={''} />
      <SortItem />
      <ShopCard />
    </main>
  );
}
