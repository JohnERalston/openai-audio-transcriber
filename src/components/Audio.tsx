"use client";
import React, { FC, useEffect, useState } from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

type Props = {
  url: string;
};

export const Audio: FC<Props> = ({ url }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, [url]);

  if (show) {
    return <AudioPlayer showDownloadProgress src={url} />;
  }

  return null;
};
