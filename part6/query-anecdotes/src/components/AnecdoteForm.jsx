import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../../context/NotificationContext";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      notificationDispatch({
        type: "NEW",
        payload: newAnecdote,
      });

      setTimeout(() => {
        notificationDispatch({
          type: "RESET",
        });
      }, 5000);
    },
    onError: () => {
      notificationDispatch({
        type: "NEW_ERROR",
      });

      setTimeout(() => {
        notificationDispatch({
          type: "RESET",
        });
      }, 5000);
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote:", content);
    newAnecdoteMutation.mutate({
      content,
      id: (Math.random() * 10000).toFixed(0),
      votes: 0,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
