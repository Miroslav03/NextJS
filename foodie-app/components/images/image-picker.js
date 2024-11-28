"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
    const [image, setImage] = useState();
    const inputRef = useRef();

    const handlePick = () => {
        inputRef.current.click();
    };

    const handleImageChnage = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setImage(fileReader.result);
        };
    };

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!image && <p>No image picked yet!</p>}
                    {image && (
                        <Image
                            src={image}
                            alt="The image selcted by the user"
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
                    ref={inputRef}
                    onChange={handleImageChnage}
                    required
                ></input>
                <button
                    className={classes.button}
                    type="button"
                    onClick={handlePick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
}
