document.addEventListener('DOMContentLoaded', function() {
    const topBtn = document.getElementById("topBtn");

    window.onscroll = () => {
        if (
            document.body.scrollTop > 200 ||
            document.documentElement.scrollTop > 200
        ) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    };
});

function topFunction() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}