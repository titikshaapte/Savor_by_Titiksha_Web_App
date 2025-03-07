import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  time_to_cook: number;
  vegetarian: boolean;
  ingredients: string[];
  procedure: string;
}

async function getRecipes(): Promise<Recipe[]> {
  try {
    const result = await fetch("http://localhost:4000/recipes");
    if (!result.ok) {
      throw new Error("Failed to fetch recipes");
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return await result.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export default async function Home() {
  const receipes = await getRecipes();

  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {receipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow border border-gray-200 rounded-lg overflow-hidden"
          >
            <CardHeader className="flex flex-row items-center gap-4 p-5">
              <Avatar className="w-25 h-25 border-2 border-gray-300 shadow-sm">
                <AvatarImage
                  src={`/Images/${recipe.image}`}
                  alt="recipe img"
                  className="object-cover"
                />
                <AvatarFallback className="text-lg font-bold text-gray-700">
                  {recipe.title.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl lg:text-1xl font-semibold text-gray-900">
                  {recipe.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-700">
                  {recipe.time_to_cook} min to cook.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 leading-relaxed">
                {recipe.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-5 border-t border-gray-200">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>View Recipe</Button>
                </DialogTrigger>
                <DialogContent className="p-6 bg-white rounded-lg shadow-xl w-full max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 flex justify-between items-center pr-3">
                      {recipe.title}
                      {recipe.vegetarian ? (
                        <Badge
                          //variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          🟢 Veg
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-red-100 text-red-800"
                        >
                          🔴 Non-Veg
                        </Badge>
                      )}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 mt-4 text-lg">
                      <h2 className="text-xl font-semibold text-gray-700 mb-3">
                        Ingredients
                      </h2>
                      <ul className="bg-gray-100 p-4 rounded border-l-4 border-blue-500 list-disc list-inside text-lg">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                      <h2 className="text-xl font-semibold text-gray-700 mt-5 mb-3">
                        Method
                      </h2>
                      <p className="bg-gray-100 p-4 rounded border-l-4 border-green-500">
                        {recipe.procedure}
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button className="bg-green-600 text-white px-6 py-3 rounded text-lg hover:bg-green-700 transition">
                      👍 Like
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {recipe.vegetarian ? (
                <Badge
                  //variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  🟢 Veg
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  🔴 Non-Veg
                </Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
