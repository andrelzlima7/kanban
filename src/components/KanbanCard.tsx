import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { Post } from "./Post";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface PropsPost {
  title: string;
  content: string;
  status: string;
}

interface Cards {
  title: string;
}

interface PropsKanbanCard {
  title: string;
  posts: PropsPost[];
  setPosts: void | any;
  statusCard: Cards[];
  setEditTitleCard: void | any;
  editTitleCard: string;
  editCard: void | any;
  id: number;
  deleteCard: void | any;
}

export const KanbanCard = ({
  title,
  posts,
  setPosts,
  statusCard,
  setEditTitleCard,
  editTitleCard,
  editCard,
  id,
  deleteCard,
}: PropsKanbanCard) => {
  const [titlePost, setTitlePost] = useState("");
  const [contentPost, setContentPost] = useState("");

  /**
   * Adicionar um novo post, consiste em adicionar um novo objeto ao arrau de posts.
   */
  const addNewPost = () => {
    setPosts([
      ...posts,
      { title: titlePost, content: contentPost, status: title },
    ]);

    setTitlePost("");
    setContentPost("");
  };

  /**
   * Deletar um post, consiste me filtrar a a função, ou seja, criar um novo array sem o item do id selecionado e depois alterar o estado do array de posts passando o novo array filtrado
   * @param id (Number) id do item no array.
   */
  const deletePost = (id: number) => {
    const filterPostIt = posts.filter((_, index) => index !== id);
    setPosts(filterPostIt);
  };

  const editPost = (
    id: number,
    status: string,
    newTitle: string,
    newContent: string
  ) => {
    posts[id] = {
      title: newTitle,
      content: newContent,
      status: status,
    };

    setPosts([...posts]);
  };

  const editStatusPost = (
    id: number,
    status: string,
    currentTitle: string,
    currentContent: string
  ) => {
    posts[id] = {
      title: currentTitle,
      content: currentContent,
      status: status,
    };

    setPosts([...posts]);
  };

  return (
    <div className="w-96 p-6">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger className="text-primary">
              <CirclePlus />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-4">
                  <span>Novo Post:</span>
                </DialogTitle>
                <div className="flex flex-col gap-2">
                  <Input
                    value={titlePost}
                    onChange={(e) => setTitlePost(e.target.value)}
                    type="text"
                    placeholder="Novo Título"
                  />
                  <Textarea
                    value={contentPost}
                    onChange={(e) => setContentPost(e.target.value)}
                    placeholder="Conteúdo"
                  />
                </div>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={addNewPost}>Post</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <h3 className="font-bold text-xl">{title}</h3>
        </div>
        <div className="flex gap-4 items-center">
          <Dialog>
            <DialogTrigger className="text-primary">
              <Pencil />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-4">Renomear Card</DialogTitle>
                <div className="flex flex-col gap-2">
                  <Input
                    value={editTitleCard}
                    onChange={(e) => setEditTitleCard(e.target.value)}
                    type="text"
                    placeholder="Novo Título"
                  />
                </div>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => editCard(id)}>Renomear</Button>
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
                  <span>
                    Deseja realmente excluir o card{" "}
                    <span className="text-primary font-bold">#{title} </span>e
                    todos os seus posts ?
                  </span>
                </DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button variant={"destructive"} onClick={() => deleteCard(id)}>
                  Excluir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        {posts.map((post, id) => {
          if (post.status === title) {
            return (
              <Post
                key={id}
                content={post.content}
                status={post.status}
                title={post.title}
                deletePost={deletePost}
                id={id}
                editPost={editPost}
                editStatusPost={editStatusPost}
                statuscard={statusCard}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
