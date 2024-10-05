'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { LoginUser } from '@/types/auth'
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
  username: z.string().min(1, {
    message: "E-poçt və ya İstifadəçi adınızı daxil edin",
  }),
  password: z.string().min(1, {
    message: "Şifrənizi daxil edin",
  }),
})

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError(null)
    try {
      const userData = await AuthService.login(data as LoginUser)
      localStorage.setItem('token', userData.token)
      router.push('/')
    } catch (error) {
      console.error('Login failed:', error)
      setError('Giriş uğursuz oldu. Zəhmət olmasa məlumatlarınızı yoxlayın.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Giriş</CardTitle>
          <CardDescription>Hesabınıza daxil olun</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-poçt və ya İstifadəçi adı</FormLabel>
                    <FormControl>
                      <Input placeholder="E-poçt və ya İstifadəçi adınızı daxil edin" {...field} />
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
                    Giriş edilir...
                  </>
                ) : (
                  'Giriş'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Hesabınız yoxdur? <Link href="/register" className="text-blue-600 hover:underline">Qeydiyyatdan keçin</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}