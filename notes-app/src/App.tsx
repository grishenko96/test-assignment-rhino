import NotesPage from "./pages/NotesPage.tsx";
import NotesProvider from "./context/NotesProvider.tsx";

function App() {

  return (
    <>
      <NotesProvider>
        <div id="app">
          <NotesPage/>
        </div>
      </NotesProvider>
    </>
  )
}

export default App
