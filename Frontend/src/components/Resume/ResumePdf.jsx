import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const ResumePdf = ({ resume }) => {
  const skills = splitList(resume.skills);
  const hasContact = [resume.email, resume.phone, resume.location].some(Boolean);

  return (
    <Document title={`${resume.name || "CareerLens"} Resume`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerMain}>
            <Text style={styles.name}>{resume.name || "Your Name"}</Text>
            <Text style={styles.title}>{resume.title || "Target Role"}</Text>
          </View>

          {hasContact && (
            <View style={styles.contact}>
              {resume.email && <Text>{resume.email}</Text>}
              {resume.phone && <Text>{resume.phone}</Text>}
              {resume.location && <Text>{resume.location}</Text>}
            </View>
          )}
        </View>

        {resume.summary && (
          <Section title="Profile">
            <Text style={styles.bodyText}>{resume.summary}</Text>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Skills">
            <View style={styles.skills}>
              {skills.map((skill) => (
                <Text key={skill} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </Section>
        )}

        <Section title="Experience">
          {resume.experience.filter(hasValue).map((item, index) => (
            <Entry
              key={`${item.role}-${index}`}
              title={item.role}
              subtitle={item.company}
              meta={item.duration}
              details={item.details}
            />
          ))}
        </Section>

        <Section title="Projects">
          {resume.projects.filter(hasValue).map((item, index) => (
            <Entry
              key={`${item.name}-${index}`}
              title={item.name}
              subtitle={item.tech}
              details={item.details}
            />
          ))}
        </Section>

        <Section title="Education">
          {resume.education.filter(hasValue).map((item, index) => (
            <Entry
              key={`${item.degree}-${index}`}
              title={item.degree}
              subtitle={item.school}
              meta={item.year}
            />
          ))}
        </Section>
      </Page>
    </Document>
  );
};

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const Entry = ({ title, subtitle, meta, details }) => (
  <View style={styles.entry}>
    <View style={styles.entryHeader}>
      <View style={styles.entryMain}>
        {title && <Text style={styles.entryTitle}>{title}</Text>}
        {subtitle && <Text style={styles.entrySubtitle}>{subtitle}</Text>}
      </View>
      {meta && <Text style={styles.meta}>{meta}</Text>}
    </View>
    {details && <Text style={styles.bodyText}>{details}</Text>}
  </View>
);

const splitList = (value = "") =>
  value
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean);

const hasValue = (item) =>
  Object.values(item).some((value) => typeof value === "string" && value.trim());

const styles = StyleSheet.create({
  page: {
    padding: 36,
    backgroundColor: "#FFFFFF",
    color: "#111827",
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.45,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#2563EB",
    paddingBottom: 16,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
  },
  headerMain: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  title: {
    marginTop: 5,
    fontSize: 12,
    color: "#2563EB",
    fontFamily: "Helvetica-Bold",
  },
  contact: {
    width: 170,
    gap: 3,
    color: "#4B5563",
    textAlign: "right",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    marginBottom: 7,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionBody: {
    gap: 8,
  },
  bodyText: {
    color: "#374151",
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skill: {
    borderWidth: 1,
    borderColor: "#BFDBFE",
    backgroundColor: "#EFF6FF",
    color: "#1D4ED8",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 9,
  },
  entry: {
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
    marginBottom: 3,
  },
  entryMain: {
    flex: 1,
  },
  entryTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  entrySubtitle: {
    marginTop: 2,
    color: "#4B5563",
    fontFamily: "Helvetica-Bold",
  },
  meta: {
    color: "#6B7280",
    fontSize: 9,
  },
});

export default ResumePdf;
