export interface galleryItem{
      id: number;
      title: string;
      image: string; 
}
export const galleryItems : galleryItem[] = Array.from({length:5},(_,i)=>(
    {
        id:i + 1,
        title:`타이틀 ${i+1}`,
        image: `/images/bg${i+1}.png`
    }
));