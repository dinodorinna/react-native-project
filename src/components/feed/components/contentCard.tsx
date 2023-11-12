import dayjs from "dayjs";
import { View, Text, StyleSheet, Image } from "react-native";

type ContentCard = {
  title: string;
  chapter: any[];
  coverId: string;
};

const ContentCard = ({ title, coverId, chapter }: ContentCard) => {
  return (
    <View style={styles.container}>
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <Image
          style={styles.image}
          source={{
            uri: `https://manga-notify-static.manneaber.xyz/images/${coverId}.256.webp`,
          }}
        />
        <View style={styles.chapterContainer}>
          {chapter
            ?.map((item) => (
              <View key={item.id} style={styles.chapterCard}>
                <Text style={{ marginBottom: 8 }}>{item.title}</Text>
                <Text
                  style={{ fontSize: 12, color: "#323232" }}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  Last updated at{" "}
                  {dayjs(item.createdAt).format("D MMM YYYY h:mm A")}
                </Text>
              </View>
            ))
            .slice(0, 2)}
        </View>
      </View>
    </View>
  );
};
export default ContentCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#032d37",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    borderRadius: 4,
    width: 76,
  },
  title: {
    color: "white",
    marginBottom: 8,
  },
  chapterContainer: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#053c4a",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  chapterCard: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ceeaf1",
    display: "flex",
    flexDirection: "column",
  },
});
