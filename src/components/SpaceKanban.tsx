"use client";
import { Pencil, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { KanbanCard } from "./KanbanCard";
import { Button } from "./ui/button";
import { dbCards } from "@/db/cards";
import { dbPosts } from "@/db/posts";

interface Cards {
  title: string;
}

interface Posts {
  title: string;
  content: string;
  status: string;
}

export const SpaceKanban = () => {
  const [cards, setCards] = useState<Cards[]>([]);

  const [posts, setPosts] = useState<Posts[]>([]);

  const [finishEffect, setFinishEffect] = useState(false);

  /**
   * Alterar titulo principal do Kanban
   */
  const [titleKanban, setTitleKanban] = useState("Meu Kanban");

  const [titleNewCard, setTitleNewCard] = useState("");

  // Efeito para carregar o array do localStorage ao montar o componente
  useEffect(() => {
    const storedCards = localStorage.getItem("cards");
    const storedPosts = localStorage.getItem("posts");
    const storedTitleKanban = localStorage.getItem("titleKanban");

    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }

    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }

    if (storedTitleKanban) {
      setTitleKanban(storedTitleKanban);
    }

    setFinishEffect(true);
  }, []);

  // Efeito para salvar o array no localStorage sempre que ele for atualizado
  useEffect(() => {
    if (finishEffect) {
      localStorage.setItem("cards", JSON.stringify(cards));
      localStorage.setItem("posts", JSON.stringify(posts));
      localStorage.setItem("titleKanban", titleKanban);
    }
  }, [cards, posts, finishEffect, titleKanban]);

  /**
   * Adicionar um novo Card, funçao adicionar um novo objeto ao array de cards
   */
  const addCard = () => {
    setCards([...cards, { title: titleNewCard }]);
  };

  const [editTitleCard, setEditTitleCard] = useState("");

  const editCard = (id: number) => {
    posts.forEach((post, index) => {
      if (post.status === cards[id].title) {
        posts[index].status = editTitleCard;
      }
    });
    cards[id] = { title: editTitleCard };

    setCards([...cards]);
  };

  const deleteCard = (id: number) => {
    posts.forEach((post, indexPost) => {
      if (post.status === cards[id].title) {
        const filterPostIt = posts.filter((_, index) => index !== indexPost);
        setPosts(filterPostIt);
      }
    });

    const filterCard = cards.filter((_, index) => index !== id);
    setCards(filterCard);
  };

  return (
    <div className="bg-secondary mt-1 ml-10 p-14 w-full rounded-tl-[40px] hidden md:flex flex-col gap-8">
      <div className="flex gap-2 items-center">
        <h1 className="font-bold text-3xl">{titleKanban}</h1>
        <Dialog>
          <DialogTrigger
            title="Editar Titulo"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            <Pencil />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">
                De um novo título ao seu Kanban{" "}
              </DialogTitle>
              <div>
                <Input
                  value={titleKanban}
                  onChange={(e) => setTitleKanban(e.target.value)}
                  type="text"
                  placeholder="Novo Título"
                />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger
            title="Adicionar Card"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            <Plus />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">
                <span>Qual o nome do seu novo card ?</span>
              </DialogTitle>
              <div>
                <Input
                  value={titleNewCard}
                  onChange={(e) => setTitleNewCard(e.target.value)}
                  type="text"
                  placeholder="Novo Título"
                />
              </div>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={addCard}>Criar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {cards.length === 0 && (
        <div className="w-96 p-6 flex flex-col  border border-primary rounded-xl">
          <p className="">
            Adicione um novo card clicando no ícone disponível acima
          </p>
          <span className="m-auto">
            <Plus className="text-primary" />
          </span>
        </div>
      )}

      <div className="flex justify-center gap-12 w-full flex-wrap overflow-y-auto">
        {cards.map((card, id) => {
          return (
            <KanbanCard
              key={id}
              title={card.title}
              posts={posts}
              setPosts={setPosts}
              statusCard={cards}
              setEditTitleCard={setEditTitleCard}
              editTitleCard={editTitleCard}
              editCard={editCard}
              id={id}
              deleteCard={deleteCard}
            />
          );
        })}
      </div>
    </div>
  );
};
