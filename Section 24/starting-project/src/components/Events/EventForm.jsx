import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ImagePicker from "../ImagePicker.jsx";
import { fetchSelectableImages } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

/* 
  Neste app não pode ter upload de arquivos de img. Somente poderá escolher quais imagens disponíveis no backend para representar o envento.
  Logo, usou-se useQuery para para pegar especificamente as imagens. Já que no back-end deste app, já está configurado para isso.
  Com os dados fornecidos pelo tanstack, podemos saber se houve erro, se ainda está em submissão ou se teve erro. Com essas informações definimos o conteúdo da interface dinamicamente.
*/

export default function EventForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  const { data, isPending, isError } = useQuery({
    queryKey: ["events-images"],
    queryFn: fetchSelectableImages,
  });

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ""}
        />
      </p>
      {isPending && <p>Loading selectable images...</p>}
      {isError && (
        <ErrorBlock
          title="Failed to load selectable images"
          message="Please try again later"
        ></ErrorBlock>
      )}
      {data && (
        <div className="control">
          <ImagePicker
            images={data}
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        </div>
      )}

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ""}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ""}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ""}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ""}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}
