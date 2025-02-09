import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNotificationDispatch } from "../context/NotificationContext";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes";

const App = () => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
      notificationDispatch({
        type: "VOTE",
        payload: updatedAnecdote,
      });

      setTimeout(() => {
        notificationDispatch({
          type: "RESET",
        });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes + 1,
    });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteService.getAll,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const anecdotes = result.data?.sort((a, b) => b.votes - a.votes);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      {result.isSuccess &&
        anecdotes.map((anecdote) => (
          <div style={{ marginTop: 6 }} key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes} <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
