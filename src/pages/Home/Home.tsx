import * as zod from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { HandPalm, Play } from "phosphor-react";
import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Countdown } from "./components/Countdown/Countdown";
import { CyclesContext } from "../../contexts/CyclesContexts";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm/NewCycleForm";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(1).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
export function Home() {
  const { activeCycle, createNewCycle, stopCycle } = useContext(CyclesContext);
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm;
function handleCreateNewCycle(data: NewCycleFormData){
  createNewCycle(data);
  reset();
}
  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={stopCycle}>
            <HandPalm size={24} /> Parar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
