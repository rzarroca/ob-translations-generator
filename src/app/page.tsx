"use client";

import { useState } from "react";
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

export default function Home() {
  const [formData, setFormData] = useState({
    projectPrefix: "",
    epic: "",
    section: "",
    id: "",
    translations: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Here you would typically send the data to your backend or perform other actions
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>OB Translation Generator</CardTitle>
          <CardDescription>
            Enter project details and translations below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
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
                      value={formData.projectPrefix}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="epic">Epic</Label>
                    <Input
                      id="epic"
                      name="epic"
                      placeholder="Enter epic"
                      value={formData.epic}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      name="section"
                      placeholder="Enter section"
                      value={formData.section}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="border rounded-md p-4">
                <legend className="text-sm font-semibold px-2">
                  Translation Details
                </legend>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="id">ID</Label>
                    <Input
                      id="id"
                      name="id"
                      placeholder="Enter translation ID"
                      value={formData.id}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="translations">Translations</Label>
                    <Textarea
                      id="translations"
                      name="translations"
                      placeholder="Enter translations"
                      value={formData.translations}
                      onChange={handleChange}
                      rows={4}
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
