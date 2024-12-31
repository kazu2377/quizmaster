"use client";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { useState } from "react";
import { useForm } from "react-hook-form";

import ChatForm from "@/components/Chat/ChatForm";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatScroll from "@/components/Chat/ChatScroll";

import axios from "axios";
import * as z from "zod";

const FormSchema = z.object({
  prompt: z.string().min(2, {
    message: "2文字以上入力する必要があります。",
  }),
});

export type FormValues = z.infer<typeof FormSchema>;

const dummyChat = [
  {
    role: "user",
    content: "こんにちは",
  },
  {
    role: "assistant",
    content: "こんにちは！何かお手伝いできますか？",
  },
  {
    role: "user",
    content: "こんにちは",
  },
  {
    role: "assistant",
    content: "こんにちは！何かお手伝いできますか？",
  },
];

// チャット画面
const Chat = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  // フォームの状態を管理
  const form = useForm<FormValues>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(FormSchema),
  });

  // ローディング状態
  const loading = form.formState.isSubmitting;

  // フォームの送信
  const onSubmit = async (data: FormValues) => {
    try {
      // ユーザーのメッセージ作成
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: data.prompt,
      };

      // ユーザーのメッセージ追加
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      // APIコール
      const response = await axios.post("/api/chat", {
        messages: newMessages,
      });

      if (response.status === 200) {
        // レスポンスのメッセージ追加
        setMessages((current) => [...current, response.data]);
        // フォームのリセット
        form.reset();
      } else {

        // エラーの場合
        toast({
          variant: "destructive",
          title: "メッセージの取得に失敗しました",
          description: "内容をご確認ください",
        });
      }
    } catch (error) {
      console.error(error);
      // エラーの場合
      toast({
        variant: "destructive",
        title: "メッセージの取得に失敗しました",
        description: "内容をご確認ください",
      });
    } finally {
      // リフレッシュ
      router.refresh();
    }
  };

  return (
    <>
      {/* メッセージ */}
      <ChatMessages messages={messages} loading={loading} />
      {/* スクロール */}
      <ChatScroll messages={messages} />
      {/* 送信フォーム */}
      <div className="fixed bottom-0 pb-16 inset-x-0 max-w-screen-md px-5 mx-auto bg-white">
        <ChatForm form={form} onSubmit={onSubmit} loading={loading} />
      </div>
    </>
  );
};

export default Chat;
