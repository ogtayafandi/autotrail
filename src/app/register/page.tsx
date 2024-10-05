'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { RegisterUser } from '@/types/auth'
import AuthService from '@/api/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ReloadIcon } from "@radix-ui/react-icons"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ad və Soyadınızı ən azı 10 simvol olmalıdır",
  }),
  username: z.string().min(2, {
    message: "İstifadəçi adı ən azı 3 simvol olmalıdır",
  }),
  email: z.string().email({
    message: "Düzgün e-poçt ünvanı daxil edin",
  }),
  password: z.string().min(8, {
    message: "Şifrə ən azı 8 simvol olmalıdır",
  }),
})

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError(null)
    try {
      const userData = await AuthService.register(data as RegisterUser)
      console.log(userData, 'userData')
      router.push('/login')
    } catch (error) {
      console.error('Qeydiyyat uğursuz oldu:', error)
      setError('Qeydiyyat uğursuz oldu. Zəhmət olmasa məlumatlarınızı yoxlayın.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Qeydiyyat</CardTitle>
          <CardDescription>Yeni hesab yaradın</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ad və Soyad</FormLabel>
                    <FormControl>
                      <Input placeholder="Ad və Soyadınızı daxil edin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İstifadəçi adı</FormLabel>
                    <FormControl>
                      <Input placeholder="İstifadəçi adınızı daxil edin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-poçt</FormLabel>
                    <FormControl>
                      <Input placeholder="E-poçt ünvanınızı daxil edin" {...field} />
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
                    <FormLabel>Şifrə</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Şifrənizi daxil edin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Qeydiyyatdan keçilir...
                  </>
                ) : (
                  'Qeydiyyatdan keç'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Artıq hesabınız var? <Link href="/login" className="text-blue-600 hover:underline">Daxil olun</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}