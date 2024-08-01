"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

/**
 * aula 439:Srtating with custom Image Picker
 *  Nessa aula izemos o componente ImagePicker, definindo os componentes básico da interface.
 *  Para isso, definimos o label e o name dinamicamente.
 * accept="image/png image/jpeg": faz com que só aceite formatos png e jpeg.
 *  Para personalizar melhor o input que faz a submissão da imagem. comocamos o input como invisível e adiconamos um botão.
 *  Ao clicar no botão, que será personalizado, através do onClick, e com uso de ref, direcionamos o click do botão para o input. Abrindo assim, o input de imagem quando clicamos no botão
 *
 */
/**
 * aula 440: Adding image preview
 *  Para atualizar a interface cada vez que mudarmos o arquivo de imagem temos que utilizar useState.
 *  Para quegar as imagens que selecionamos para upload adicionamos a funcção handleImageChange que vai atualizar a tela cada vez que selecionarmso um arq de img diferente.
 * const file = event.target.files[0]: seleciona o arquivo que selecionamos para upload. Como só tem um file será feito a seleção file[0]
 *  Nós fazemos a leitura do arquivo através do FileReader.
 *  Para pegar a fonte url da imagem que faremos o upload fazemos fileReader.readAsDataURL(file).
 *  Quando terminar, irá chamar a função onload. Dentro da função on Load iremos atualizar o useState, e consequentemente atualizar a interface para mostrar o preview da img.
 *
 */
export default function ImagePicker({ label, name }) {
  const [pickedImage, setImagePicked] = useState(null);

  const imageInput = useRef();

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setImagePicked(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePicked(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  function handlePickClick() {
    imageInput.current.click();
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        ></input>
        <button
          onClick={handlePickClick}
          className={classes.button}
          type="button"
        >
          Pick a Image
        </button>
      </div>
    </div>
  );
}
