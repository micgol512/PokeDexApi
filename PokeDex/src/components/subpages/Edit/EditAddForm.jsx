import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import { enqueueSnackbar } from "notistack";
import useRegisterNewPoke from "../../../hooks/useRegisterNewPoke";
import { PokemonsListContext } from "../../../context";
import { updateLocalDatabase } from "../../../services/functions";
import { StyledButton, StyledInput, Wrapper } from "../../shared";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  height: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Height must be a positive number" })
    .transform((val) => parseFloat(val)),
  weight: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Height must be a positive number" })
    .transform((val) => parseFloat(val)),
  base_experience: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Height must be a positive number" })
    .transform((val) => parseFloat(val)),

  ability: z.string().min(1, { message: "Ability is required" }),
});

const StyledImg = styled.img`
  filter: ${({ disabled }) => (disabled ? "grayscale(100%)" : "none")};
`;

const EditAddForm = () => {
  const navigate = useNavigate();
  const { pokemonsList } = useContext(PokemonsListContext);
  const { id } = useParams();
  const [futureID, setFutureID] = useState(152);
  const [name, setName] = useState("");
  const [ability, setAbility] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [base_experience, setBase_experience] = useState("");

  const { registerNewPoke, error } = useRegisterNewPoke();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      name: "",
      ability: "",
      height: 0,
      weight: 0,
      base_experience: 0,
    },
  });

  const prevImg = () => {
    if (futureID > 1) setFutureID((prev) => prev - 1);
  };

  const nextImg = () => {
    if (futureID < 10277) setFutureID((prev) => prev + 1);
  };

  const onSubmit = async (data) => {
    const fullData = {
      ...data,
      id: futureID,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${futureID}.png`,
    };
    const result = id
      ? await updateLocalDatabase(id, fullData)
      : await registerNewPoke(fullData);
    if (result) {
      enqueueSnackbar("Succesfull Add/Edit pokemon", {
        variant: "success",
      });
    } else {
      console.error(error);
      enqueueSnackbar(`Error: ${error}`, { variant: "error" });
    }
    setName("");
    setAbility("");
    setHeight("");
    setWeight("");
    setBase_experience("");
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      const pokemon = pokemonsList.find((poke) => poke.id === parseInt(id));
      if (pokemon) {
        setName(pokemon.name);
        setAbility(pokemon.ability);
        setHeight(pokemon.height);
        setWeight(pokemon.weight);
        setBase_experience(pokemon.base_experience);
        setFutureID(pokemon.id);
      }
    }
  }, [id, pokemonsList]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper styles={{ gap: "10px" }}>
        <label>Select Image</label>
        <StyledImg
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${futureID}.png`}
          alt="pokemon"
          disabled={
            pokemonsList.some((pokemon) => pokemon.id === futureID) && !id
          }
        />

        {!id && (
          <Wrapper styles={{ flexDirection: "row", justifyContent: "center" }}>
            <StyledButton onClick={prevImg}>{"<"}</StyledButton>
            <StyledButton onClick={nextImg}>{">"}</StyledButton>
          </Wrapper>
        )}

        <StyledInput
          register={register}
          name="name"
          label="Name"
          type="text"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledInput
          register={register}
          name="ability"
          label="Ability"
          type="text"
          error={!!errors.ability}
          helperText={errors.ability ? errors.ability.message : ""}
          value={ability}
          onChange={(e) => setAbility(e.target.value)}
        />
        <StyledInput
          register={register}
          name="height"
          label="Height"
          type="number"
          error={!!errors.height}
          helperText={errors.height ? errors.height.message : ""}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <StyledInput
          register={register}
          name="weight"
          label="Weight"
          type="number"
          error={!!errors.weight}
          helperText={errors.weight ? errors.weight.message : ""}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <StyledInput
          register={register}
          name="base_experience"
          label="Base Experience"
          type="number"
          error={!!errors.base_experience}
          helperText={
            errors.base_experience ? errors.base_experience.message : ""
          }
          value={base_experience}
          onChange={(e) => setBase_experience(e.target.value)}
        />
        <StyledButton
          type="submit"
          disabled={
            pokemonsList.some((pokemon) => pokemon.id === futureID) && !id
          }
        >
          {id ? "Submit changes" : "Add new Pokemon"}
        </StyledButton>
      </Wrapper>
    </form>
  );
};

export default EditAddForm;
