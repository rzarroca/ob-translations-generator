"use client";
// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// Handlers
import { handleGeneration } from "./handlers";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>OB Translation Generator</CardTitle>
          <CardDescription>
            Enter project details and translations below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleGeneration}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <fieldset className="border rounded-md p-4">
                <legend className="text-sm font-semibold px-2">
                  Project Setup
                </legend>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="projectPrefix">Project Prefix</Label>
                    <Input
                      id="projectPrefix"
                      name="projectPrefix"
                      placeholder="Enter project prefix"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="epic">Epic</Label>
                    <Input id="epic" name="epic" placeholder="Enter epic" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      name="section"
                      placeholder="Enter section"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="border rounded-md p-4">
                <legend className="text-sm font-semibold px-2">
                  Translation 1
                </legend>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="id1">ID</Label>
                    <Input
                      id="id1"
                      name="id1"
                      placeholder="Enter translation ID"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="translation1">Translation 1</Label>
                    <Textarea
                      id="translation1"
                      name="translation1"
                      placeholder="Enter translation"
                      rows={3}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="border rounded-md p-4">
                <legend className="text-sm font-semibold px-2">
                  Translation 2
                </legend>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="id2">ID</Label>
                    <Input
                      id="id2"
                      name="id2"
                      placeholder="Enter translation ID"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="translation2">Translation 2</Label>
                    <Textarea
                      id="translation2"
                      name="translation2"
                      placeholder="Enter translations"
                      rows={3}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Generate</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
