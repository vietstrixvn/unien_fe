'use client';

import { useRef, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { CreateContactItem } from '@/types';
import { useCreateContact } from '@/hooks/contact/useContact';
import contactInfo from '@/data/contact.data.json';
import appInfo from '@/data/app.data.json';
import { SectionHeader } from './SectionHeader';
import { contactSentFormSchema } from '@/utils';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export function ContactComponent() {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof contactSentFormSchema>>({
    resolver: zodResolver(contactSentFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      message: '',
    },
  });

  const { mutate: createContact } = useCreateContact();

  const handleSentContact = (values: z.infer<typeof contactSentFormSchema>) => {
    setIsLoading(true);

    const contactData: CreateContactItem = {
      name: values.name,
      email: values.email,
      phone_number: values.phone_number,
      message: values.message,
    };

    createContact(contactData, {
      onSuccess: () => {
        form.reset({
          name: '',
          email: '',
          phone_number: '',
          message: '',
        });
        setIsLoading(false);

        form.clearErrors();
      },
      onError: (error: any) => {
        form.setError('root', {
          type: 'manual',
          message: error.message || 'Error',
        });
        setIsLoading(false);
      },
    });
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 mb-8">
          <SectionHeader title={contactInfo.ContactData.title} />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {contactInfo.ContactData.content}
            <br />
            Chúng Tôi
          </h2>
          <p className="text-muted-foreground max-w-[600px]">
            {contactInfo.ContactData.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                <Phone className="h-5 w-5 text-main" />
              </div>
              <div>
                <h3 className="font-semibold">Tel</h3>
                <p className="text-muted-foreground">+84 (123) 456-789</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                <Mail className="h-5 w-5 text-main" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">info@example.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                <MapPin className="h-5 w-5 text-main" />
              </div>
              <div>
                <h3 className="font-semibold">Địa Chỉ</h3>
                <p className="text-muted-foreground">
                  {appInfo.AppData.address}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2" ref={formRef}>
            <form
              className="grid gap-4"
              onSubmit={form.handleSubmit(handleSentContact)}
            >
              <div className="space-y-2">
                <Input
                  id="Name"
                  placeholder="Tên"
                  {...form.register('name')}
                  required
                  className="border-gray-300"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="unien@unien.com"
                    {...form.register('email')}
                    required
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="(+00)000000"
                    {...form.register('phone_number')}
                    className="border-gray-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Textarea
                  id="message"
                  placeholder="Message"
                  {...form.register('message')}
                  className="min-h-[120px] border-gray-300"
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                disabled={isLoading}
                className="w-full bg-main hover:bg-yellow-600 text-black font-medium"
              >
                {isLoading ? 'Đang Gửi...' : 'Gửi'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
