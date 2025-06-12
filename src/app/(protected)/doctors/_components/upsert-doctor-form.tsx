import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { medicalSpecialties } from "./_constants";

const formSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Nome é obrigatório" }),

    specialty: z
      .string()
      .trim()
      .min(1, { message: "Especialidade é obrigatória" }),

    appointmentPrice: z
      .number()
      .min(1, { message: "Preço da consulta é obrigatório" }),

    availableFromWeekDay: z.string(),
    availableToWeekDay: z.string(),
    availableFromTime: z
      .string()
      .min(1, { message: "Horário de início é obrigatório" }),

    availableToTime: z
      .string()
      .min(1, { message: "Horário de término é obrigatório" }),
  })

  .refine(
    (data) => {
      return Number(data.availableFromTime) < Number(data.availableToTime);
    },
    {
      message:
        "O horario de inicio nao pode ser anterior ao horario de termino",
      path: ["availableToTime"],
    },
  );

const UpsertDoctorForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      specialty: "",
      appointmentPrice: 0,
      availableFromWeekDay: "1",
      availableToWeekDay: "5",
      availableFromTime: "",
      availableToTime: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar médico</DialogTitle>
        <DialogDescription>Adicione um novo</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especialidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma especialidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {medicalSpecialties.map((specialty) => (
                      <SelectItem key={specialty.value} value={specialty.value}>
                        {specialty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appointmentPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço da consulta</FormLabel>
                <NumericFormat
                  value={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue);
                  }}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  allowNegative={false}
                  allowLeadingZeros={false}
                  thousandSeparator="."
                  customInput={Input}
                  prefix="R$"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableFromWeekDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia inicial de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um dia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Domingo</SelectItem>
                    <SelectItem value="1">Segunda-feira</SelectItem>
                    <SelectItem value="2">Terça-feira</SelectItem>
                    <SelectItem value="3">Quarta-feira</SelectItem>
                    <SelectItem value="4">Quinta-feira</SelectItem>
                    <SelectItem value="5">Sexta-feira</SelectItem>
                    <SelectItem value="6">Sábado</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableToWeekDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dia final de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um dia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Domingo</SelectItem>
                    <SelectItem value="1">Segunda-feira</SelectItem>
                    <SelectItem value="2">Terça-feira</SelectItem>
                    <SelectItem value="3">Quarta-feira</SelectItem>
                    <SelectItem value="4">Quinta-feira</SelectItem>
                    <SelectItem value="5">Sexta-feira</SelectItem>
                    <SelectItem value="6">Sábado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableFromTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário inicial de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Manhã</SelectLabel>
                      <SelectItem value="0">05:00</SelectItem>
                      <SelectItem value="1">05:30</SelectItem>
                      <SelectItem value="2">06:00</SelectItem>
                      <SelectItem value="3">06:30</SelectItem>
                      <SelectItem value="4">07:00</SelectItem>
                      <SelectItem value="5">07:30</SelectItem>
                      <SelectItem value="6">08:00</SelectItem>
                      <SelectItem value="7">08:30</SelectItem>
                      <SelectItem value="8">09:00</SelectItem>
                      <SelectItem value="9">09:30</SelectItem>
                      <SelectItem value="10">10:00</SelectItem>
                      <SelectItem value="11">10:30</SelectItem>
                      <SelectItem value="12">11:00</SelectItem>
                      <SelectItem value="13">11:30</SelectItem>
                      <SelectItem value="14">12:00</SelectItem>
                      <SelectItem value="15">12:30</SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      <SelectLabel>Tarde</SelectLabel>
                      <SelectItem value="16">13:00</SelectItem>
                      <SelectItem value="17">13:30</SelectItem>
                      <SelectItem value="18">14:00</SelectItem>
                      <SelectItem value="19">14:30</SelectItem>
                      <SelectItem value="20">15:00</SelectItem>
                      <SelectItem value="21">15:30</SelectItem>
                      <SelectItem value="22">16:00</SelectItem>
                      <SelectItem value="23">16:30</SelectItem>
                      <SelectItem value="24">17:00</SelectItem>
                      <SelectItem value="25">17:30</SelectItem>
                      <SelectItem value="26">18:00</SelectItem>
                      <SelectItem value="27">18:30</SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      <SelectLabel>Noite</SelectLabel>
                      <SelectItem value="28">19:00</SelectItem>
                      <SelectItem value="29">19:30</SelectItem>
                      <SelectItem value="30">20:00</SelectItem>
                      <SelectItem value="31">20:30</SelectItem>
                      <SelectItem value="32">21:00</SelectItem>
                      <SelectItem value="33">21:30</SelectItem>
                      <SelectItem value="34">22:00</SelectItem>
                      <SelectItem value="35">22:30</SelectItem>
                      <SelectItem value="36">23:00</SelectItem>
                      <SelectItem value="37">23:30</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availableToTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário final de disponibilidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Manhã</SelectLabel>
                      <SelectItem value="0">05:00</SelectItem>
                      <SelectItem value="1">05:30</SelectItem>
                      <SelectItem value="2">06:00</SelectItem>
                      <SelectItem value="3">06:30</SelectItem>
                      <SelectItem value="4">07:00</SelectItem>
                      <SelectItem value="5">07:30</SelectItem>
                      <SelectItem value="6">08:00</SelectItem>
                      <SelectItem value="7">08:30</SelectItem>
                      <SelectItem value="8">09:00</SelectItem>
                      <SelectItem value="9">09:30</SelectItem>
                      <SelectItem value="10">10:00</SelectItem>
                      <SelectItem value="11">10:30</SelectItem>
                      <SelectItem value="12">11:00</SelectItem>
                      <SelectItem value="13">11:30</SelectItem>
                      <SelectItem value="14">12:00</SelectItem>
                      <SelectItem value="15">12:30</SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      <SelectLabel>Tarde</SelectLabel>
                      <SelectItem value="16">13:00</SelectItem>
                      <SelectItem value="17">13:30</SelectItem>
                      <SelectItem value="18">14:00</SelectItem>
                      <SelectItem value="19">14:30</SelectItem>
                      <SelectItem value="20">15:00</SelectItem>
                      <SelectItem value="21">15:30</SelectItem>
                      <SelectItem value="22">16:00</SelectItem>
                      <SelectItem value="23">16:30</SelectItem>
                      <SelectItem value="24">17:00</SelectItem>
                      <SelectItem value="25">17:30</SelectItem>
                      <SelectItem value="26">18:00</SelectItem>
                      <SelectItem value="27">18:30</SelectItem>
                    </SelectGroup>

                    <SelectGroup>
                      <SelectLabel>Noite</SelectLabel>
                      <SelectItem value="28">19:00</SelectItem>
                      <SelectItem value="29">19:30</SelectItem>
                      <SelectItem value="30">20:00</SelectItem>
                      <SelectItem value="31">20:30</SelectItem>
                      <SelectItem value="32">21:00</SelectItem>
                      <SelectItem value="33">21:30</SelectItem>
                      <SelectItem value="34">22:00</SelectItem>
                      <SelectItem value="35">22:30</SelectItem>
                      <SelectItem value="36">23:00</SelectItem>
                      <SelectItem value="37">23:30</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertDoctorForm;
