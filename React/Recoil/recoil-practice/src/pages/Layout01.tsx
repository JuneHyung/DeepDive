import NavHeader from "@/components/common/NavHeader";
import TodoList from "@/components/todo/TodoList";

const Layout01 = () => {
  return (
    <div className="layout-01">
      <header className="layout-01-header">
        <NavHeader />
      </header>
      <main className="layout-01-container">
        <section className="box-left">
          <TodoList />
        </section>
      </main>
      <footer className="layout-01-footer">Footer</footer>
    </div>
  );
};

export default Layout01;
