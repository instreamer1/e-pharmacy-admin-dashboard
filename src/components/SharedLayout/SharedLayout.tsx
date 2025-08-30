import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

const SharedLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Контент */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SharedLayout;

// Компонент рендерится на маршрут "/". Включает в себя Header и Sidebar и оборачивает вложенные маршруты с их соответствующими страницами.
// Компонент Header состоит из: 
// ✔ Компонент Logo, отображающий логотип приложения и кликабельный, переадресовывает пользователя на главную страницу (для незарегистрированного пользователя - LoginPage) 
// ✔ Компонент Title("Medicine Store") 
// ✔ Компонент Sub-title (""Dasboard"") - ссылка, которая перенаправляется по маршруту /dasboard 
// ✔ Компонент Sub-title ("/vendor@gmail.com") - текст 
// ✔ Компонент LogoutBtn, который делает запрос на сервер и перенаправляет пользователя на LoginPage."