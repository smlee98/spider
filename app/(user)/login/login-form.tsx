"use client";

import { login } from "@/actions/user/action";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof FormSchema>;

const FormSchema = z.object({
  id: z.string().min(1, {
    message: "아이디가 입력되지 않았습니다."
  }),
  password: z.string().min(1, {
    message: "비밀번호가 입력되지 않았습니다."
  })
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: "",
      password: ""
    }
  });

  const onSubmit = async (data: FormData) => {
    const res = await login({ data });

    if (res && "id" in res) {
      router.push("/");
    } else {
      form.setError("password", { message: "아이디 또는 비밀번호를 확인해주세요." });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" id="user-name" placeholder="이름" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type="password"
                    id="user-password"
                    placeholder="비밀번호"
                    onKeyDown={(e) => e.key === "Enter" && form.handleSubmit(onSubmit)()}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex items-center gap-x-1.5">
          <Lock />
          로그인
        </Button>
      </form>
    </Form>
  );
}
