<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $comment = strip_tags(trim($_POST["comment"]));
    $email = "garpia.lana@gmail.com";

    // Проверка данных
    if (empty($name) OR empty($phone) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Здесь вы можете добавить логику для ответа, если данные некорректны
        http_response_code(400);
        echo "Пожалуйста, заполните форму и попробуйте снова.";
        exit;
    }

    // Текст письма
    $message = "Имя: $name\n";
    $message .= "Телефон: $phone\n\n";
    $message .= "Комментарий:\n$comment\n";

    // Заголовки письма
    $headers = "From: $name <$email>";

    // Отправка письма
    if (mail($email, "Новая заявка с сайта", $message, $headers)) {
        http_response_code(200);
        echo "Спасибо! Ваша заявка была отправлена.";
    } else {
        http_response_code(500);
        echo "Ой! Что-то пошло не так, мы не смогли отправить вашу заявку.";
    }

} else {
    // Не POST запрос, отклоняем запрос
    http_response_code(403);
    echo "Произошла ошибка, попробуйте позже.";
}
?>
