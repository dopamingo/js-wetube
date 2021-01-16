import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}); //비디오 찾을때까지 랜더 안 하고 기다림...
        res.render("home", { pageTitle: "Home", videos }); //render의 첫번째 인자는 템플릿, 두번째 인자는 담을 객체
    } catch (error) { // 예외처리
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    } 
};
    
export const search = (req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
    res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    res.redirect(routes.videoDetail(newVideo.id));
  };

export const videoDetail = async(req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("videoDetail", { pageTitle: "Video Detial", video });
    } catch(error) {
        res.redirect(route.home);
    }
};

export const editVideo = (req, res) =>
    res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
    res.render("deleteVideo", { pageTitle: "Delete Video" });