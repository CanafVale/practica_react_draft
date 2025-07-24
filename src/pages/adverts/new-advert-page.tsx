import { useState } from "react";
import { useNavigate } from "react-router";
import { isApiClientError } from "@/api/error";
import { createAdvert } from "./service";
import type { ChangeEvent, FormEvent } from "react";
import type { Tags } from "./types";
import TagsSelector from "./components/tags-selector";
import { Button } from "@/components/ui/button";
import { Euro, Loader2 } from "lucide-react";
import FormField from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import InputPhoto from "@/components/shared/input-photo";

function validatePrice(value: FormDataEntryValue | null): number {
  try {
    return Number(value);
  } catch (error) {
    console.error(error);
    return 0;
  }
}

function validatePhoto(value: FormDataEntryValue | null): File | undefined {
  if (value instanceof File) {
    return value.size ? value : undefined;
  }
  return undefined;
}

export default function NewAdvertPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [tags, setTags] = useState<Tags>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTagsChange = (tags: Tags) => {
    setTags(tags);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const sale = formData.get("sale") === "sale";
    const price = validatePrice(formData.get("price"));
    const photo = validatePhoto(formData.get("photo"));

    try {
      setLoading(true);
      const createdAdvert = await createAdvert({
        name,
        sale,
        price,
        tags,
        photo,
      });
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      if (isApiClientError(error)) {
        if (error.code === "UNAUTHORIZED") {
          return navigate("/login");
        }
      }
      setError(() => {
        throw error;
      });
    } finally {
      setLoading(false);
    }
  };

  const buttonDisabled = !name || !tags.length || loading;

  return (
    <div className="grid gap-4">
      <h2 className="text-center text-3xl">Create your advert</h2>
      <form
        className="grid gap-4 gap-x-6 sm:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <FormField>
          Name
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            autoComplete="off"
          />
        </FormField>
        <FormField>
          For sale or Looking to buy?
          <RadioGroup
            className="flex items-center p-2.5"
            name="sale"
            defaultValue="sale"
          >
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="sale" />
              For sale
            </Label>
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="buy" />
              Looking to buy
            </Label>
          </RadioGroup>
        </FormField>
        <FormField>
          <span className="flex items-center gap-1">
            Price <Euro className="stroke-primary" size={16} />
          </span>
          <Input type="number" name="price" defaultValue={0} />
        </FormField>
        <FormField>
          Tags (at least one)
          <TagsSelector onChange={handleTagsChange} className="justify-start" />
        </FormField>
        <div className="sm:col-span-2 sm:mx-auto">
          <FormField>
            Photo (click to upload)
            <InputPhoto name="photo" />
          </FormField>
        </div>
        <Button
          type="submit"
          disabled={buttonDisabled}
          className="w-full sm:col-span-2"
        >
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "Please wait" : "Create advert"}
        </Button>
      </form>
    </div>
  );
}
