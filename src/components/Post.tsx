import { Cog, Eye, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

import { Label } from "./ui/label";

interface Cards {
  title: string;
}

interface PropsPost {
  title: string;
  content: string;
  status: string;
  deletePost: void | any;
  id: number;
  editPost: void | any;
  editStatusPost: void | any;
  statuscard: Cards[];
}

export const Post = ({
  content,
  status,
  title,
  deletePost,
  id,
  editPost,
  editStatusPost,
  statuscard,
}: PropsPost) => {
  const [editTitlePost, setEditTitlePost] = useState(title);
  const [editContentPost, setEditContentPost] = useState(content);

  const [valueStatus, setValueStatus] = useState(status);

  return (
    <Card className="mt-4">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-md line-clamp-1">{title}</CardTitle>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger className="text-primary">
              <Eye />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{content}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="text-primary">
              <Cog />
            </DialogTrigger>
            <DialogContent>
              <DialogDescription className="flex flex-col gap-4 mt-4">
                <Input
                  value={editTitlePost}
                  onChange={(e) => setEditTitlePost(e.target.value)}
                  placeholder="Novo Titulo"
                />
                <Textarea
                  value={editContentPost}
                  onChange={(e) => setEditContentPost(e.target.value)}
                  placeholder="Descreva o conteúdo"
                />
              </DialogDescription>
              <DialogFooter>
                <Button
                  onClick={() =>
                    editPost(id, status, editTitlePost, editContentPost)
                  }>
                  Atualizar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="line-clamp-3 text-xs h-12 mb-2">
        <p>{content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Dialog>
          <DialogTrigger className="text-primary">
            <span className="text-primary text-xs rounded-md p-1 font-bold bg-primary/30 cursor-pointer">
              #{status}
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex flex-col gap-4 mt-4">
              <div className="flex gap-4 justify-center text-primary flex-wrap">
                {statuscard.map((status, id) => {
                  return (
                    <Label
                      key={id}
                      className="flex gap-2 bg-primary/15 p-2 rounded-lg font-bold">
                      <input
                        type="radio"
                        value={status.title}
                        checked={valueStatus === status.title}
                        onChange={(e) => setValueStatus(e.target.value)}
                      />
                      #{status.title}
                    </Label>
                  );
                })}
              </div>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => editStatusPost(id, valueStatus, title, content)}>
                Atualizar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger className="text-primary">
            <Trash2 />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">
                <span>{title}</span>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>{content}</DialogDescription>
            <DialogFooter>
              <DialogClose className="bg-secondary px-4 rounded-md">
                Cancelar
              </DialogClose>
              <Button onClick={() => deletePost(id)} variant={"destructive"}>
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
